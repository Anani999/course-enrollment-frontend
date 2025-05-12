const { useContext } = require("react")
const { AuthContext } = require("../Context/AuthContext")

const AdminRoute = ({children}) => {
    const {authState} = useContext(AuthContext);
    return authState?.user?.isAdmin ? children : 'Access Denied !';
}

export default AdminRoute;