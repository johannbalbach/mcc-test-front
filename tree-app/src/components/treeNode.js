import React, { useState } from 'react';

const TreeNode = ({ node, onAdd, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(node.id, newName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        <span>{node.name}</span>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => onAdd(node.id)}>Add</button>
      <button onClick={() => onRemove(node.id)}>Remove</button>
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