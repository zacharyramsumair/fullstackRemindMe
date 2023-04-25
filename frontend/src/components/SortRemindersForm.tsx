import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  sortOption: z.enum(['oldest', 'lastUpdated', 'complete', 'incomplete']),
});

const SelectSortOptionForm = () => {
  const [formData, setFormData] = useState({ sortOption: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onChange = (e) => {
    setFormData({ sortOption: e.target.value });
    handleSubmit(submitData)();
  };

  const submitData = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div>
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" {...register('sortOption')} onChange={onChange}>
          <option value="lastUpdated">Last Updated</option>
          <option value="oldest">Oldest</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
        {errors.sortOption && <span>{errors.sortOption.message}</span>}
      </div>
    </form>
  );
};


export default SelectSortOptionForm