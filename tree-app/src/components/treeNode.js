import React, { useState } from 'react';

const TreeNode = ({ node, onAdd, onRemove, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(node.name);

    const handleEdit = () => {
        if (isEditing) onEdit(node.id, newName);
        setIsEditing(!isEditing);
    };

    return (
        <div className="tree-node">
            {isEditing ? (
                <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                />
            ) : (
                <span>{node.name}</span>
            )}
            <button className="edit" onClick={handleEdit}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button className="add" onClick={() => onAdd(node.id)}>Add</button>
            <button className="remove" onClick={() => onRemove(node.id)}>Remove</button>
            {node.children && (
                <div>
                {node.children.map((child) => (
                    <TreeNode
                    key={child.id}
                    node={child}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onEdit={onEdit}
                    />
                ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;