export const baseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return null;
  } else {
    return "http://localhost:8080/api";
  }
};
