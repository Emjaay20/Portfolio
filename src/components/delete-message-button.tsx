'use client';

import { useState } from 'react';
import { deleteMessage } from '@/app/admin/(protected)/messages/action';

export function DeleteMessageButton({ id }: { id: number }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        const formData = new FormData();
        formData.append('id', id.toString());
        await deleteMessage(formData);
    };

    return (
        <>
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-lg font-bold mb-2">Delete Message?</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this message? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setShowConfirm(true)}
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Delete Message
            </button>
        </>
    );
}
