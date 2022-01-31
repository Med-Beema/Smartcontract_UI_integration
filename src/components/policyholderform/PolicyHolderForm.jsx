import React from 'react';
import "./policyholderform.css";

export default function PolicyHolderForm() {
  return <form action=''>
    <div className='Form container'>
        <div className="formWrapper">
            <div className='ta-fieldset title'>
                <label htmlFor="slcTitle">Title</label>
                    <select id="slcTitle" name='slcTitle' class="ta-formValue">
                        <option val="Mr">Mr</option>
                        <option val="Ms">Ms</option>
                        <option val="Mrs">Mrs</option>
                    </select>
            </div>
            <div className='Name'>
                <label>Name</label>
                <div className='ta-fieldset'>
                    <label htmlFor="txtFirstName">First</label>
                    <input class="ta-formValue" type="text" id='txtFirstName' name='txtFirstName'></input>
                </div>                
                <div className='ta-fieldset'>
                    <label htmlFor="txtMiddleName">Middle</label>
                    <input class="ta-formValue" type="text" id='txtMiddleName' name='txtMiddleName'></input>
                </div>
                <div className='ta-fieldset'>
                    <label htmlFor="txtlastName">Last</label>
                    <input class="ta-formValue" type="text" id='txtlastName' name='txtlastName'></input>
                </div>
            </div>
            <div className='Dob ta-fieldset'>
                <label htmlFor='txtDOB'>Date Of Birth</label>
                <input class="ta-formValue" type="date" id='txtDOB' name='txtDOB'></input>
            </div>
            <div className='ta-fieldset'>
                <label>Gender</label> 
                <input class="ta-formValue" type="radio" id="cbmale" name="cbmale" value="Male"></input>
                <label htmlFor="cbmale">Male</label>
                <input class="ta-formValue" type="radio" id="cbfemale" name="cbfemale" value="Female"></input>
                <label htmlFor="cbfemale">Female</label>
                <input class="ta-formValue" type="radio" id="cbothers" name="cbothers" value="Others"></input>
                <label htmlFor="cbothers">Others</label>
            </div>
            
            <div className='ta-fieldset'>
                <label>Address</label> 
                <div className='ta-fieldset'>
                    <label htmlFor='txtMunicipality'>Municipality</label>
                    <input class="ta-formValue" type="text" id='txtMunicipality' name='txtMunicipality'></input>
                </div>                
                <div className='ta-fieldset'>
                    <label htmlFor='txtDistrict'>District</label>
                    <input class="ta-formValue" type="text" id='txtDistrict' name='txtDistrict'></input>
                </div>
                <div className='ta-fieldset'>
                    <label htmlFor='txtState'>State</label>
                    <input class="ta-formValue" type="text" id='txtState' name='txtState'></input>
                </div>

                <div className='ta-fieldset'>
                    <label htmlFor='txtWardNo'>Ward No</label>
                    <input class="ta-formValue" type="tel" id='txtWardNo' name='txtWardNo'></input>
                </div>
                
            </div>
            <div className='ta-fieldset'>
                <label>Contact Information</label> 
                <div className='ta-fieldset'>
                    <label htmlFor='txtLandlineNo'>Landline</label>
                    <input class="ta-formValue" type="tel" id='txtLandlineNo' name='txtLandlineNo'></input>
                </div>
                <div className='ta-fieldset'>
                    <label htmlFor='txtMobileNo'>Mobile Number</label>
                    <input class="ta-formValue" type="tel" id='txtMobileNo' name='txtMobileNo'></input>
                </div>
                <div className='ta-fieldset'>
                    <label htmlFor='txtEmail'>Email</label>
                    <input class="ta-formValue" type="text" id='txtEmail' name='txtEmail'></input>
                </div>
            </div>
            <div className='ta-fieldset'>
                <label htmlFor='txtCitizenShip'>CitizenShip</label>
                <input class="ta-formValue" type="file" id='txtCitizenShip' name='txtCitizenShip'></input>
            </div >
            <input type="button" value="Submit"></input>
        </div>
    </div>
  </form>;
}
