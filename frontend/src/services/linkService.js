import api from "./api";

export const createLink = (data) =>
  api.post("/links", data);

export const getLinksByCollection = (id) =>
  api.get(`/links/collection/${id}`);

export const updateLink = (id, data) =>
  api.patch(`/links/${id}`, data);

export const deleteLink = (id) =>
  api.delete(`/links/${id}`);

export const getFavoriteLinks = () =>
  api.get("/links/favorites");

export const getArchivedLinks = () =>
  api.get("/links/archived");

export const toggleFavorite = (id) =>
  api.patch(`/links/${id}/favorite`);