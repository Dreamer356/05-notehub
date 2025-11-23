import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

import NotesView from "../NoteList/NoteList";
import FilterInput from "../SearchBox/SearchBox";
import Pager from "../Pagination/Pagination";
import Dialog from "../Modal/Modal";
import NoteDialog from "../NoteForm/NoteForm";
import Spinner from "../Loader/Loader";
import AlertMessage from "../ErrorMessage/ErrorMessage";

import styles from "./App.module.css";

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [debouncedTerm] = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const {
    data: notesData,
    isLoading: loading,
    isError: hasError,
    error: fetchError,
  } = useQuery({
    queryKey: ["notes", currentPage, debouncedTerm],
    queryFn: () => fetchNotes(currentPage, debouncedTerm),
    placeholderData: (oldData) => oldData,
  });

  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setShowModal(false);
    },
  });

  const removeNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const updateSearchTerm = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const updatePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const openDialog = () => setShowModal(true);
  const closeDialog = () => setShowModal(false);

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <FilterInput value={searchTerm} onChange={updateSearchTerm} />

        {notesData && notesData.totalPages > 1 && (
          <Pager
            totalPages={notesData.totalPages}
            selectedPage={currentPage}
            onSwitch={updatePage}
          />
        )}

        <button className={styles.button} onClick={openDialog}>
          Create note +
        </button>
      </header>

      {loading && <Spinner />}
      {hasError && <AlertMessage message={(fetchError as Error).message} />}

      {notesData && notesData.notes.length > 0 && (
        <NotesView notes={notesData.notes} onDelete={removeNoteMutation.mutate} />
      )}

      {showModal && (
        <Dialog onClose={closeDialog}>
          <NoteDialog onCancel={closeDialog} onSubmit={addNoteMutation.mutate} />
        </Dialog>
      )}
    </div>
  );
};

export default MainApp;
