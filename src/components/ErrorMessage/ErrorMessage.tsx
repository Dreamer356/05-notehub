interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p
      style={{
        color: "red",
        textAlign: "center",
        fontWeight: 500,
        marginTop: "20px"
      }}
    >
      Error: {message}
    </p>
  );
};

export default ErrorMessage;