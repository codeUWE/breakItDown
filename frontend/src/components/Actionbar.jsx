import Chat from './Chat';
import QuickAdd from './QuickAdd';
import SearchBar from './SearchBar';

function Actionbar() {
	return (
		<>
			<div className="w-[385px] h-[50px] bg-blue-50">
                <div className='flex flex-row justify-between content-center'>
                <SearchBar />
                <QuickAdd />
                <Chat />
                </div>
            </div>
		</>
	);
}

export default Actionbar;