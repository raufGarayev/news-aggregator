import { createContext, useState, Dispatch, SetStateAction } from "react";

type User = {
    username: string;
    password: string;
}

interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<UserContextInterface>({
    user: {
        username: '',
        password: ''
    },
    setUser: () => {}
})

type UserProviderProps = {
    children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })

    return (
        <UserContext.Provider
            value={{user, setUser}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;