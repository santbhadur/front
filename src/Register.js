import React from 'react';

export default function Register(props) {
  return (
    <>
    <div className='container card p-2 mt-2'>
        <h1 className='text-center'>Register Form</h1>
        <form onSubmit = {props.submit}>
            <div className='form-group'>
                <label htmlFor='name'>name</label>
                <input type="text" name="name" id="name" className="form-control" />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="text" name="email" id="email" className="form-control" />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="text" name="password" id="password" className="form-control" />
            </div>
            <button type="Submit" id="submit" className="btn btn-primary m-1" >
              Register
            </button>
        </form>
    </div>
    </>
  );
}
