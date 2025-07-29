import { Upload, X } from 'lucide-react'
import React, { useState } from 'react'
import type { Expense } from '../../app'
import {
  useAddExpense,
  useCategories,
  useEditExpense,
} from '../../hooks/useQueries'
import { useAppStore } from '../../stores/appStore'
import './ExpenseForm.scss'

export default function ExpenseForm() {
  const { setCurrentPage, setEditingExpense, editingExpense, currentPage } =
    useAppStore()
  const { data: categories } = useCategories()
  const addExpenseMutation = useAddExpense()
  const editExpenseMutation = useEditExpense()

  const [formData, setFormData] = useState({
    amount: editingExpense?.amount || '',
    category: editingExpense?.category || '',
    description: editingExpense?.description || '',
    date: editingExpense?.date || new Date().toISOString().split('T')[0],
    receipt: editingExpense?.receipt || null,
  })
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (currentPage === 'edit' && editingExpense) {
      editExpenseMutation.mutate({
        ...formData,
        id: editingExpense.id,
      } as Expense)
    } else {
      addExpenseMutation.mutate(formData as Expense)
    }
    setEditingExpense(undefined)
    setCurrentPage('expenses')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, receipt: file.name }))
      setPreviewFile(file.name)
    }
  }

  function onCancel() {
    setEditingExpense(undefined)
    setCurrentPage('expenses')
  }

  return (
    <div className='expense-form'>
      <div className='expense-form__header'>
        <h1 className='expense-form__title'>
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h1>
        <button
          onClick={onCancel}
          className='expense-form__close'
        >
          <X className='icon icon--medium' />
        </button>
      </div>
      <div className='expense-form__content'>
        <form
          onSubmit={handleSubmit}
          className='expense-form__form'
        >
          <div className='form-field'>
            <label className='form-field__label'>Amount (£)</label>
            <input
              type='number'
              step='0.01'
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, amount: e.target.value }))
              }
              className='form-field__input'
              required
            />
          </div>
          <div className='form-field'>
            <label className='form-field__label'>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className='form-field__select'
              required
            >
              <option value=''>Select category</option>
              {categories?.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-field'>
            <label className='form-field__label'>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className='form-field__textarea'
              required
            />
          </div>
          <div className='form-field'>
            <label className='form-field__label'>Date</label>
            <input
              type='date'
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              className='form-field__input'
              required
            />
          </div>
          <div className='file-upload'>
            <input
              type='file'
              onChange={handleFileChange}
              accept='.pdf,.jpg,.jpeg,.png'
              className='file-upload__input'
              id='receipt-upload'
            />
            <label
              htmlFor='receipt-upload'
              className='file-upload__button'
            >
              <Upload className='icon icon--medium' />
              Upload Receipt
            </label>
            {(previewFile || formData.receipt) && (
              <span className='file-upload__filename'>
                {previewFile || formData.receipt}
              </span>
            )}
          </div>
          <div className='form-actions'>
            <button
              type='button'
              onClick={onCancel}
              className='button button--secondary'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button button--primary'
            >
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
