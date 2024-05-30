import React, { useState } from 'react';
import TreeNode from './treeNode';

const fullCopy = (obj) => {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (Array.isArray(obj))
        return obj.map(fullCopy);
    const copiedObj = {};

    for (let key in obj) 
    {
        if (obj.hasOwnProperty(key))
            copiedObj[key] = fullCopy(obj[key]);
    }
    return copiedObj;
};

const calculateInitialCounter = (tree, count) => {
    count++;
    for (let child of tree.children) 
    {
        count = calculateInitialCounter(child, count);
    }
    return count;
};

const initialTree = {
    id: 1,
    name: 'Node 1',
    children: [
        {
        id: 2,
        name: 'Node 2',
        children: [
            { id: 3, name: 'Node 3', children: [] },
            { id: 5, name: 'Node 5', children: [] },
        ],
        },
        { id: 4, name: 'Node 4', children: [] },
    ],
};
const initialCounter = calculateInitialCounter(initialTree, 2);

const Tree = () => {
    const [tree, setTree] = useState(fullCopy(initialTree));
    const [idCounter, setIdCounter] = useState(initialCounter);

    const findNode = (id, node) => {
        if (node.id === id)
             return node;

        for (let child of node.children) 
        {
            const result = findNode(id, child);
            if (result)
                return result;
        }

        return null;
    };

    const addNode = (id) => {
        const newNode = { id: idCounter, name: `Node ${idCounter}`, children: [] };
        setIdCounter(idCounter + 1);

        const newTree = fullCopy(tree);
        const node = findNode(id, newTree);
        node.children.push(newNode);

        setTree(newTree);
    };

    const removeNode = (id) => {
        const removeHelper = (node) => {
            node.children = node.children.filter((child) => child.id !== id);
            node.children.forEach(removeHelper);
        };
        const newTree = fullCopy(tree);

        if (newTree.id !== id) removeHelper(newTree);

        setTree(newTree);
    };

    const editNode = (id, name) => {
        const newTree = fullCopy(tree);
        const node = findNode(id, newTree);
        node.name = name;
        setTree(newTree);
    };

    const resetTree = () => {
        setTree(fullCopy(initialTree));
        setIdCounter(initialCounter);
    };

    const getTree = () => {
        console.log(tree);
        console.log(idCounter);
        console.log('initial data', initialTree, initialCounter);
    };

    return (
        <div>
            <TreeNode node={tree} onAdd={addNode} onRemove={removeNode} onEdit={editNode} />
            <button className="reset" onClick={resetTree}>Reset</button>
            <button className="reset" onClick={getTree}>Data</button>
        </div>
    );
};

export default Tree;