import express from 'express';
import { config } from 'dotenv';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }
});
const port = process.env.PORT || 5000;

const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const ERROR = 'error';
const USER_CONNECTED = 'USER_CONNECTED';
const USER_DISCONNECTED = 'USER_DISCONNECTED';
const USER_JOINED_ROOM = 'USER_JOINED_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';
const CREATE_ROOM = 'CREATE_ROOM';
const ROOM_CREATED = 'ROOM_CREATED';
const MAKE_MOVE = 'MAKE_MOVE';
const GAME_OVER = 'GAME_OVER';
const RESET_GAME = 'RESET_GAME';
const UPDATE_GAME = 'UPDATE_GAME';
const UPDATE_HISTORY = 'UPDATE_HISTORY';


type HistoryProps = {
  [key: string]: {
    board: any,
    currentPlayer: string,
    winner: string | null,
    isGameOver: boolean,
    host: string,
    opponent?: string,
  }
}

const history: HistoryProps = {
  '123' : {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isGameOver: false,
    host: 'John',
  },
  '456' : {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isGameOver: false,
    host: 'John',
  },
};


// A simple in-memory store for this example. For a production system, you'd likely use a more persistent storage solution.
const codeToUuidMap: Record<string, string> = {};

/**
 * Hashes a UUID to generate a 6-figure code.
 * Note: This is a simple hash function for demonstration and might produce collisions in a real-world scenario.
 */
function hashUuidToCode(uuid: string): string {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Ensure the result is a 6-figure code, adjust the logic here based on your needs
  return Math.abs(hash % 1000000).toString().padStart(6, '0');
}

/**
 * Converts a UUID to a 6-figure code.
 */
function uuidToCode(uuid: string): string {
  const code = hashUuidToCode(uuid);
  codeToUuidMap[code] = uuid; // Store the mapping
  return code;
}

/**
 * Retrieves a UUID from a 6-figure code.
 */
function codeToUuid(code: string): string | null {
  return codeToUuidMap[code] || null;
}


const newGame = (host: string) => ({
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isGameOver: false,
  host,
});
const checkWinner = (board: any) => {
  const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; 
      }
    }
    return null;
};

// Check for a tie
const isTie = (board: any) => {
  return board.every((cell: null | string) => cell !== null);
};

// Connect to socket
io.on(CONNECTION, (socket: Socket) => {
  
  // When a user create a room''
  socket.on(CREATE_ROOM, (username) => {
    const roomId = uuidv4();
    const code = uuidToCode(roomId);
    socket.join(roomId);
    history[roomId] = newGame(username);
    socket.emit(ROOM_CREATED, { roomId: code });
  });

  // When a user connects to a room
  socket.on(JOIN_ROOM, (data: {
    roomId: string,
    username: string
  }) => {
    try {
      const roomId = codeToUuid(data.roomId);
      if (!roomId) {
        throw new Error('Invalid room ID');
      }
      socket.join(roomId);
      if (!history[roomId]) {
        throw new Error('Room not found');
      }
      if (history[roomId].opponent) {
        throw new Error('Room is full');
      }
      history[roomId].opponent = data.username;

      socket.emit(UPDATE_HISTORY, { history });
      socket.broadcast.to(roomId).emit(USER_JOINED_ROOM,
        {
          username: data.username,
          message: 'has joined the room',
          board: history[roomId].board,
        }
      );

    } catch (error: any) {
      socket.emit(ERROR, { message: error.message });
    }
  });

  // When a user make a move
  socket.on(MAKE_MOVE, (data: {
    roomId: string,
    cell: number,
    username: string,
  }) => {
    try {
      console.log('ss');
      
      if (!history[data.roomId]) {
        throw new Error('Room not found');
      }
      const { board, currentPlayer, isGameOver } = history[data.roomId];
      if (isGameOver) {
        throw new Error('Game is over');
      }
      if (currentPlayer !== data.username) {
        throw new Error('Not your turn');
      }
      if (board[data.cell] !== null) {
        throw new Error('Cell is not empty');
      }
      board[data.cell] = currentPlayer;
      const winner = checkWinner(board);
      const tie = isTie(board);
      if (winner || tie) {
        history[data.roomId].isGameOver = true;
        history[data.roomId].winner = winner;
      } else {
        history[data.roomId].currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
      io.to(data.roomId).emit(UPDATE_GAME, { board, currentPlayer: history[data.roomId].currentPlayer, winner, isGameOver: history[data.roomId].isGameOver });
    } catch (error: any) {
      socket.emit(ERROR, { message: error.message });
    }
  });

  socket.on(DISCONNECT, () => {});

});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});