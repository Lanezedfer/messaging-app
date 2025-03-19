import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { setSelectedConversation } from "../../state/conversation/conversationSlice.ts";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(
    (state) => state.conversation.conversations,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else toast.error("No user found");
  };

  return (
    <form onSubmit={handleSubmit} className="flex item-center gap-2">
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
