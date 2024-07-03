import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import ProductList from "../../products/components/ProductList";
import RegisterLoan from "../../loans/components/RegisterLoan";
import ConfirmationLoan from "../../loans/components/ConfirmationLoan";
import LoanInfo from "../../loans/components/LoanInfo";
import MemberSelected from "../../loans/components/MemberSelected";
import MemberInfo from "../../loans/components/MemberInfo";
import RegisterDevolution from "../../loans/components/RegisterDevolution";
import RelatedDevolutions from "../../loans/components/RelatedDevolutions";
import DevolutionInfo from "../../loans/components/DevolutionInfo";
import ConfirmationDevolution from "../../loans/components/ConfirmationDevolution";
import RegisterManualLoan from "../../loans/components/RegisterManualLoan";
import RegisterManualDevolution from "../../loans/components/RegisterManualDevolution";
import Map from "../../products/components/Map";
import ProductInfo from "../../products/components/ProductInfo";
import ProductForm from "../../products/components/ProductForm";
import EntityAdmin from "../../admin/entities/components/EntityAdmin";
import CreateEntity from "../../admin/entities/components/CreateEntity";
import EditEntity from "../../admin/entities/components/EditEntity";
import MemberAdmin from "../../admin/members/components/MemberAdmin";
import CreateMember from "../../admin/members/components/CreateMember";
import EditMember from "../../admin/members/components/EditMember";
import ProductAdmin from "../../admin/products/components/ProductAdmin";
import CreateProduct from "../../admin/products/components/CreateProduct";
import EditProduct from "../../admin/products/components/EditProduct";
import LoanAdmin from "../../admin/loans/components/LoanAdmin";
import EditLoan from "../../admin/loans/components/EditLoan";
import CreateLoan from "../../admin/loans/components/CreateLoan";
import LoanDetails from "../../admin/loans/components/LoanDetails";
import EntityInfo from "../../loans/components/EntityInfo";
import UserAdmin from "../../admin/users/components/UserAdmin";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
                {loggedIn && <Route path="/products/product-list" element={<ProductList/>}/>}
                {loggedIn && <Route path="/loans/select-member" element={<RegisterLoan/>}/>}
                {loggedIn && <Route path="/loans/confirmation" element={<ConfirmationLoan/>}/>}
                {loggedIn && <Route path="/loans/info" element={<LoanInfo/>}/>}
                {loggedIn && <Route path="/loans/member-selected" element={<MemberSelected/>}/>}
                {loggedIn && <Route path="/loans/member/:id" element={<MemberInfo/>}/>}
                {loggedIn && <Route path="/loans/entity/:id" element={<EntityInfo/>}/>}
                {loggedIn && <Route path="/loans/scan-devolution" element={<RegisterDevolution/>}/>}
                {loggedIn && <Route path="/loans/related-devolutions" element={<RelatedDevolutions/>}/>}
                {loggedIn && <Route path="/loans/confirmation-devolution" element={<ConfirmationDevolution/>}/>}
                {loggedIn && <Route path="/loans/devolution-info" element={<DevolutionInfo/>}/>}
                {loggedIn && <Route path="/loans/select-member/register-manual" element={<RegisterManualLoan/>}/>}
                {loggedIn && <Route path="/loans/scan-devolution/register-manual" element={<RegisterManualDevolution/>}/>}
                {loggedIn && <Route path="/map" element={<Map/>}/>}
                {loggedIn && <Route path="/products/product-list/:id" element={<ProductInfo/>}/>}
                {loggedIn && <Route path="/product-form" element={<ProductForm/>}/>}
                {loggedIn && <Route path="/admin-entities" element={<EntityAdmin/>}/>}
                {loggedIn && <Route path="/admin-members" element={<MemberAdmin/>}/>}
                {loggedIn && <Route path="/admin-products" element={<ProductAdmin/>}/>}
                {loggedIn && <Route path="/admin-loans" element={<LoanAdmin/>}/>}
                {loggedIn && <Route path="/admin-users" element={<UserAdmin/>}/>}
                {loggedIn && <Route path="/admin-entities/createEntity" element={<CreateEntity/>}/>}
                {loggedIn && <Route path="/admin-entities/editEntity/:id" element={<EditEntity/>}/>}
                {loggedIn && <Route path="/admin-members/createMember" element={<CreateMember/>}/>}
                {loggedIn && <Route path="/admin-members/editMember/:id" element={<EditMember/>}/>}
                {loggedIn && <Route path="/admin-products/createProduct" element={<CreateProduct/>}/>}
                {loggedIn && <Route path="/admin-products/editProduct/:id" element={<EditProduct/>}/>}
                {loggedIn && <Route path="/admin-loans/createLoan" element={<CreateLoan/>}/>}
                {loggedIn && <Route path="/admin-loans/editLoan/:id" element={<EditLoan/>}/>}
                {loggedIn && <Route path="/admin-loans/details/:id" element={<LoanDetails/>}/>}
                {loggedIn && <Route path="/admin-users/register-user" element={<SignUp/>}/>}
            </Routes>
        </div>

    );

};

export default Body;
