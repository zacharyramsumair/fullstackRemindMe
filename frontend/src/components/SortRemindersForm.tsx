import { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  sortOption: z.enum(['oldest', 'lastUpdated', 'complete', 'incomplete', "dueDate"]),
});

const SelectSortOptionForm = (props) => {
  const [formData, setFormData] = useState({ sortOption: 'lastUpdated' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  useEffect(()=>{
    props.setSortOption(formData.sortOption)
  }, [formData])

  const onChange = (e) => {
    setFormData({ sortOption: e.target.value });
    handleSubmit(submitData)();
  };

  const submitData = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className='sortForm'>
      <div>
        <label htmlFor="sortOption" className='sortLabel'>Sort by:</label>
        <select id="sortOption" {...register('sortOption')} onChange={onChange}>
          <option value="lastUpdated">Last Updated</option>
          <option value="oldest">Oldest</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
          <option value="dueDate">Due Date</option>
        </select>
        {errors.sortOption && <span>{errors.sortOption.message}</span>}
      </div>
    </form>
  );
};


export default SelectSortOptionForm