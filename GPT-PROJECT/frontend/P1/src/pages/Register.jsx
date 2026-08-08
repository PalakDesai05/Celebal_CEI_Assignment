import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, User, Building, MapPin, DollarSign, Mail, Lock, Shield } from 'lucide-react';

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France'];
const CURRENCIES = {
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'Canada': 'CAD',
  'Australia': 'AUD',
  'India': 'INR',
  'Germany': 'EUR',
  'France': 'EUR',
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'employee',
    name: '',
    companyName: '',
    country: '',
    currency: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    const fields = ['name', 'companyName', 'country', 'currency', 'email', 'password'];
    fields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate Registration API & Login
    setTimeout(() => {
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.role
      }));
      
      setIsLoading(false);
      
      // Navigate based on role selection
      if (formData.role === 'admin') navigate('/admin/dashboard');
      else if (formData.role === 'manager') navigate('/manager/dashboard');
      else navigate('/employee/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const nextData = { ...prev, [name]: value };
      if (name === 'country' && CURRENCIES[value]) {
        nextData.currency = CURRENCIES[value];
      }
      return nextData;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const InputField = ({ id, label, type = 'text', icon: Icon, placeholder, list }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
        {type === 'select' ? (
          <select
            id={id}
            name={id}
            value={formData[id]}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
              errors[id] ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
            } rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none`}
          >
            {id === 'role' ? null : <option value="" disabled>Select {label}</option>}
            {list.map(item => (
              <option key={item.value || item} value={item.value || item}>{item.label || item}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            value={formData[id]}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-2.5 bg-slate-50 border ${
              errors[id] ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300'
            } rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            placeholder={placeholder}
          />
        )}
      </div>
      {errors[id] && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Start managing expenses in seconds
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <InputField 
          id="role" 
          label="Account Role" 
          icon={Shield} 
          type="select" 
          list={[
            { label: 'Employee', value: 'employee' },
            { label: 'Manager', value: 'manager' },
            { label: 'Administrator', value: 'admin' }
          ]} 
        />
        
        <InputField id="name" label="Full Name" icon={User} placeholder="John Doe" />
        <InputField id="companyName" label="Company Name" icon={Building} placeholder="Acme Corp" />
        
        <div className="grid grid-cols-2 gap-4">
          <InputField id="country" label="Country" icon={MapPin} type="select" list={COUNTRIES} />
          <InputField id="currency" label="Currency" icon={DollarSign} type="select" list={Array.from(new Set(Object.values(CURRENCIES)))} />
        </div>

        <InputField id="email" label="Email Address" type="email" icon={Mail} placeholder="john@company.com" />
        <InputField id="password" label="Password" type="password" icon={Lock} placeholder="••••••••" />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Creating account...
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
