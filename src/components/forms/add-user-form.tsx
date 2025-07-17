// UserForm.tsx
import React, { useEffect } from 'react';

interface UserFormProps {
  initialData: {
    email: string;
    firstName: string;
    lastName: string;
    isVolunteer: boolean;
    isAdmin: boolean;

  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isVolunteer"
            checked={formData.isVolunteer}
            onChange={handleChange}
            className="mr-2"
          />
          Volunteer
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className="mr-2"
          />
          Admin
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-300 rounded-md px-4 py-2">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white rounded-md px-4 py-2">Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
