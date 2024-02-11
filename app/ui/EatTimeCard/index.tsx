export default function EatTime({
    title,
}: {
    title : string
}) {
    return (
        <div className='col-span-12 flex flex-col border-y-2 md:col-span-8 md:rounded-xl md:border-2 md:mx-0'>
          <span className='border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white'>{title}</span>
          <a className='px-4 py-2 text-blue-500 ' href="">Agregar alimento</a>
        </div>
    );
}