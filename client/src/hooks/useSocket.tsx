import React, { useState, useEffect, useRef, useCallback } from 'react';
import io, { ManagerOptions, SocketOptions } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';
const JOIN_ROOM = 'JOIN_ROOM';
const USER_JOINED_ROOM = 'USER_JOINED_ROOM';
const GAME_UPDATE = 'GAME_UPDATE';
const MAKE_MOVE = 'MAKE_MOVE';
const CREATE_ROOM = 'CREATE_ROOM';
const ERROR = 'error';
const ROOM_CREATED = 'ROOM_CREATED';

export default function useSocket(
  username: string,
  connectSocket: boolean,
  uri: string = SERVER_URL,
  opts?: Partial<ManagerOptions & SocketOptions> | undefined
) {
  const socketRef = useRef(io(uri, opts));
  const [board, setBoard] = useState<string[]>(Array(9).fill(null) as string[]);
  const [xTurn, setXTurn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    if (!connectSocket) return;

    // Connect to the socket server
    socketRef.current = io(SERVER_URL);

    // Create or join a room
    socketRef.current.emit(CREATE_ROOM, username);

    // Listen for events from the server
    socketRef.current.on(ROOM_CREATED, (data: { roomId: string }) => {
      console.log(`Room created: ${data.roomId}`);
      setRoomId(data.roomId);
    });

    socketRef.current.on(
      USER_JOINED_ROOM,
      (data: {
        username: string;
        board: Array<string | null>;
        message: string;
      }) => {
        console.log(`${data.username} has joined the room.`);
        setIsPlaying(true);
        setBoard(data.board as string[]);
      }
    );

    socketRef.current.on(
      GAME_UPDATE,
      (data: { board: Array<string>; currentPlayer: string }) => {
        console.log(`Game update received.`);
        setBoard(data.board);
        setXTurn(data.currentPlayer === 'X');
      }
    );

    socketRef.current.on(ERROR, (error: { message: string }) => {
      console.error('Socket error:', error.message);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [username, connectSocket]);

  // Function to handle making a move
  const makeMove = useCallback(
    (cellIndex: number) => {
      console.log(board);

      if (board[cellIndex] || !socketRef.current) return;

      // Emit the move to the server
      socketRef.current.emit(MAKE_MOVE, {
        roomId,
        cell: cellIndex,
        username,
      });
    },
    [board, roomId, username]
  );

  const joinRoom = useCallback(
    (roomId: string) => {
      socketRef.current.emit(JOIN_ROOM, { roomId, username });
    },
    [username]
  );

  return {
    board,
    xTurn,
    makeMove,
    joinRoom,
    isPlaying,
  };
}
