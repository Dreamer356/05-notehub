interface Props {
  message: string;
}

const AlertError = ({ message }: Props) => {
  return (
    <div
      style={{
        color: "#d32f2f",
        fontWeight: 600,
        textAlign: "center",
        margin: "24px 0",
        fontFamily: "Arial, sans-serif",
      }}
      role="alert"
      aria-live="assertive"
    >
      Ошибка: {message}
    </div>
  );
};

export default AlertError;
