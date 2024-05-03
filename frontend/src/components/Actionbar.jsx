import Chat from './Chat';
import QuickAdd from './QuickAdd';
import SearchBar from './SearchBar';
import QuickAddDrop from './QuickAddDrop';

function Actionbar() {
	return (
		<>
        <div className='flex flex-col justify-center items-center'>
        <QuickAddDrop />
			<div className="w-[1025px] h-[71px] rounded-[30px] border-solid border-2 border-black">
                <div className='flex justify-around my-2'>
                <SearchBar />
                <QuickAdd />
                <Chat />
                </div>
            </div>
        </div>
		</>
	);
}

export default Actionbar;