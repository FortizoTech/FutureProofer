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
    const [user, setUser] = useState<User>({
        fullName: '',
        email: '',
        location: '',
        selectedCareer: '',
        selectedSkills: [],
        userType: 'career',
        bio: '',
        profileImageUrl: ''
    });

    const updateUser = (updates: Partial<User>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const clearUser = () => {
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
