import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Store
interface ConversationState {
  selectedConversation: ConversationType | null;
  conversations: ConversationType[];
  messages: MessageType[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  selectedConversation: null,
  conversations: [],
  messages: [],
  loading: false,
  error: null,
};

// Actions
export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/messages/conversations");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMessages = createAsyncThunk(
  "conversations/fetchMessages",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/messages/${conversationId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "An error occurred");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "conversations/sendMessage",
  async (
    { conversationId, message }: { conversationId: string; message: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(`/api/messages/send/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "An error occurred");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (
      state,
      action: PayloadAction<ConversationType | null>,
    ) => {
      state.selectedConversation = action.payload;
      state.messages = [];
    },
    setMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setMessages, setSelectedConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
