interface ItemProp{
    name: string,
    type: string,
    placeholder: string,
    title: string
}
const AuthItem = ({name, type, placeholder, title}: ItemProp) => {
  return (
    <fieldset className="flex flex-col">
        <label htmlFor={name} className="text-sm text-gray-600 font-[ClashDisplay] font-bold tracking-wider">{title}</label>
        <input type={type} placeholder={placeholder} className="w-full mt-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16A34A] font-[Onest]"/>
    </fieldset>
  )
}

export default AuthItem