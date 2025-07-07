export const baseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "http://localhost:8080/api";
  } else {
    return "http://localhost:8080/api";
  }
};
