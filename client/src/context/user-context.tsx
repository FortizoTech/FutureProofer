import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id?: string;
    email?: string;
    fullName?: string;
    location?: string;
    selectedCareer?: string;
    selectedSkills?: string[];
    userType?: 'career' | 'business';
    bio?: string;
    profileImageUrl?: string;
}

interface UserContextType {
    user: User;
    updateUser: (updates: Partial<User>) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('future_proofer_user');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse user data', e);
                }
            }
        }
        return {
            fullName: '',
            email: '',
            location: '',
            selectedCareer: '',
            selectedSkills: [],
            userType: 'career',
            bio: '',
            profileImageUrl: ''
        };
    });

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => {
            const newUser = { ...prev, ...updates };
            localStorage.setItem('future_proofer_user', JSON.stringify(newUser));
            return newUser;
        });
    };

    const clearUser = () => {
        localStorage.removeItem('future_proofer_user');
        setUser({
            fullName: '',
            email: '',
            location: '',
            selectedCareer: '',
            selectedSkills: [],
            userType: 'career',
            bio: '',
            profileImageUrl: ''
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
