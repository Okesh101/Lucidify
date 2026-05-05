interface ItemProp{
    name: string,
    type: string,
    placeholder: string,
    title?: string,
    errorMssg?: string
    value?: string | number
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    labelStyle? :string
    fieldsetStyle?: string
    minValue?: number
}
const InputItem = ({
  name,
  type,
  placeholder,
  title,
  errorMssg,
  handleChange,
  value,
  fieldsetStyle,
  labelStyle,
  minValue
}: ItemProp) => {

  return (
    <fieldset className={fieldsetStyle ?? "flex flex-col"}>
        <label htmlFor={name} className={labelStyle ?? "text-sm text-gray-600 font-[ClashDisplay] font-bold tracking-wider"}>{title}</label>
        <input type={type} placeholder={placeholder} min={minValue} className="w-full mt-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16A34A] font-[Onest]" name={name} value={value} onChange={handleChange}/>

      {errorMssg && <p className="text-red-500 text-sm mt-1.5 font-[DMMono]">{errorMssg}</p> }
    </fieldset>
  )
}

export default InputItem