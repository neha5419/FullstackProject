import React, { useState } from 'react';
import { API_URL } from "./utils/constants.jsx";
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        job_title: '',
        api_key: ''
    });
    const [updateData, setUpdateData] = useState({});
    const [response, setResponse] = useState('');
    const [putApiKey, setPutApiKey] = useState(''); // API key for PUT
    const [patchApiKey, setPatchApiKey] = useState(''); // API key for PATCH
    const [deleteApiKey, setDeleteApiKey] = useState(''); // API key for DELETE

    // Function to handle input change for creating new user
    const createData = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getUsers = async () => {
        const res = await axios.get(API_URL);
        setUsers(res.data.data);
    };

    const getUserById = async () => {
        const res = await axios.get(`${API_URL}/${userId}`);
        setUserData(res.data);
    };

    const postUser = async () => {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                api: newUser.api_key,
            }
        };
        const res = await axios.post(API_URL, newUser, config);
        setResponse(`User created: ${JSON.stringify(res.data)}`);
        setNewUser({ first_name: '', last_name: '', gender: '', email: '', job_title: '', api_key: '' });
    };

    const putUser = async () => {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                api: putApiKey, // Use the specific API key for PUT
            }
        };
        const res = await axios.put(`${API_URL}/${userId}`, updateData, config);
        setResponse(`User updated: ${JSON.stringify(res.data)}`);
        setUpdateData({ first_name: '', last_name: '', gender: '', email: '', job_title: '', api_key: '' });
        setUserId('');
        setPutApiKey('');
    };

    const patchUser = async () => {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                api: patchApiKey, // Use the specific API key for PATCH
            }
        };
        const res = await axios.patch(`${API_URL}/${userId}`, updateData, config);
        setResponse(`User partially updated: ${JSON.stringify(res.data)}`);
        setUpdateData({ first_name: ''});
        setUserId('');
        setPatchApiKey('');
    };

    const deleteUser = async () => {
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                api: deleteApiKey, // Use the specific API key for DELETE
            }
        };
        await axios.delete(`${API_URL}/${userId}`, config);
        setResponse('User deleted');
        setUserId('');
        setDeleteApiKey('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">User API UI</h1>

                {/* Get All Users */}
                <div className="mb-6">
                    <button
                        onClick={getUsers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Get All Users
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">Users</h2>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(users, null, 2)}</pre>
                    </div>
                </div>

                {/* Get User by ID */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Get User by ID</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={getUserById}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    >
                        Get User
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(userData, null, 2)}</pre>
                    </div>
                </div>

                {/* Create User */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Create User</h2>
                    <input
                        type="text"
                        name="first_name"
                        value={newUser.first_name}
                        onChange={createData}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={newUser.last_name}
                        onChange={createData}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="gender"
                        value={newUser.gender}
                        onChange={createData}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={createData}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="job_title"
                        value={newUser.job_title}
                        onChange={createData}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        name="api_key"
                        value={newUser.api_key}
                        onChange={createData}
                        placeholder="API Key"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={postUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </div>

                {/* Update User (PUT) */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Update User (PUT)</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.last_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.gender || ''}
                        onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={updateData.email || ''}
                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.job_title || ''}
                        onChange={(e) => setUpdateData({ ...updateData, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={putApiKey}
                        onChange={(e) => setPutApiKey(e.target.value)}
                        placeholder="API Key for PUT"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={putUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                        Update User (PUT)
                    </button>
                </div>

                {/* Partially Update User (PATCH) */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Partially Update User (PATCH)</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={patchApiKey}
                        onChange={(e) => setPatchApiKey(e.target.value)}
                        placeholder="API Key for PATCH"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={patchUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                        Partially Update User (PATCH)
                    </button>
                </div>

                {/* Delete User */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Delete User</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={deleteApiKey}
                        onChange={(e) => setDeleteApiKey(e.target.value)}
                        placeholder="API Key for DELETE"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={deleteUser}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                        Delete User
                    </button>
                </div>

                {/* Response */}
                {response && (
                    <div className="p-4 mt-4 bg-green-100 text-green-700 rounded-lg">
                        <pre>{response}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
