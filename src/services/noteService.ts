import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";


const token = import.meta.env.VITE_NOTEHUB_TOKEN;


export const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`, 
  },
});

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalNotes: number;
  notes: Note[];
}

export interface DeleteNoteResponse {
  message: string;
  note: Note;
}


export async function fetchNotes(
  page: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search) {
    params.search = search;
  }

  const response = await noteApi.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}


export async function createNote(
  data: CreateNoteParams
): Promise<Note> {
  const response = await noteApi.post<Note>("/notes", data);
  return response.data;
}


export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response = await noteApi.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
}