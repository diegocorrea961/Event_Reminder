"use client";

export default function ConfirmDeleteEvent({
  onConfirm,
  onCancel,
  onEventDeleted,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  onEventDeleted: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-9 rounded-lg">
        <p>Tem certeza que deseja excluir este evento?</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              (onConfirm(), onEventDeleted());
            }}
            className="border border-fuchsia-800 text-fuchsia-800 rounded-lg shadow-lg p-5 cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => onCancel()}
            className="bg-fuchsia-800 md:hover:bg-fuchsia-900 rounded-lg shadow-lg p-5 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
