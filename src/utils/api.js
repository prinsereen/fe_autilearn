import { cookies } from "next/headers";

const api = (() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    async function getAuthToken() {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("authToken");
        return authToken?.value;
    }
    

    async function _fetchWithAuth(url, options) {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${await getAuthToken()}`,
            },
        });
        return res;
    }
    async function getMe(){
        try {            
            const response = await _fetchWithAuth("/me", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to get user data.");
            }
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function login(email, password) {
        console.log(email, password);
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email,
                    password
                })
            });
            if (!response.ok) {
                throw new Error("Failed to login.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function register(name, email, password, conf_password) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    name,
                    email,
                    password,
                    conf_password
                })
            });
            if (!response.ok) {
                throw new Error("Failed to register.");
            }
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const logout = async () => {
        try {
            const response = await _fetchWithAuth("/logout", {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to logout.");
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const createTakeQuiz = async (quiz_id, quiz_item_id, answer, correct_answer) => {
        try {
            const response = await _fetchWithAuth("/take-quiz", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    id_quiz: quiz_id,
                    id_quiz_item: quiz_item_id,
                    answer: answer,
                    correct_answer: correct_answer
                })
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                throw new Error("Failed to save quiz answer.");
            }
            // const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const createTakeQuizImage = async (quiz_id, quiz_item_id, image, correct_answer) => {
        try {
            const response = await _fetchWithAuth("/take-quiz-image", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    id_quiz: quiz_id,
                    id_quiz_item: quiz_item_id,
                    image: image,
                    correct_answer: correct_answer
                })
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                throw new Error("Failed to save quiz answer.");
            }
            // const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    async function getReport(){
        try {            
            const response = await _fetchWithAuth("/report", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Failed to get Report.");
            }
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return {
        getMe,
        login,
        register,
        logout,
        createTakeQuiz,
        createTakeQuizImage,
        getReport
    }
})();

export default api;