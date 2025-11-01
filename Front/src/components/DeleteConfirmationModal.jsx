import { Trash } from "lucide-react";

const DeleteConfirmationModal = ({
  title,
  deleteNote,
  setShowConfirmModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
        <p>
          ¿Estás seguro de que deseas eliminar la nota "{title}"? Esta acción no
          se puede deshacer.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="btn btn-ghost"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </button>
          <button className="btn btn-error" onClick={deleteNote}>
            <Trash size={15} className="mr-2" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
