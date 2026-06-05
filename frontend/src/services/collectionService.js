import api from "./api";

export const getCollections = () =>
  api.get("/collections");

export const createCollection = (data) =>
  api.post("/collections", data);

export const getCollectionById = (id) =>
  api.get(`/collections/${id}`);

export const deleteCollection = (id) =>
  api.delete(`/collections/${id}`);

export const updateCollection = (id, data) =>
  api.patch(`/collections/${id}`, data);