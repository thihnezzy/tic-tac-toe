type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type,
}) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
};
