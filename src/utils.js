import store from "@/plugins/store";

export const displayTime = (v) => {
  if (!v) {
    return "";
  }
  const now = new Date().toISOString();
  if (now.substring(0, 4) === v.substring(0, 4)) {
    return v.substring(5, 10);
  } else {
    return v.substring(0, 10);
  }
};

export const getUser = (id) => {
  return store.state.users.find((i) => i.id === id);
};
