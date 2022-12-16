import { Inbox, useUnreadThreadsCount } from "@collabkit/react";
import "@collabkit/react/dist/style.css";
import * as Popover from "@radix-ui/react-popover";
import { CloseIcon, MessageIcon } from "./icons";

export function CommentsPopover() {
  const unreadCount = useUnreadThreadsCount();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="relative font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border px-0 rounded-l-lg w-8 h-8 hover:bg-gray-100"
          aria-label="Open comments"
        >
          <MessageIcon hasUnread={unreadCount > 0} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="relative bg-white drop-shadow-2p rounded-lg z-40 transition-transform flex flex-col"
          sideOffset={2}
          arrowPadding={20}
          align="end"
        >
          <div className="flex justify-between px-4 py-3 border-b border-[#EFF0F1]">
            <div className="uppercase text-[#63676D] font-bold text-xs">
              Comments
            </div>
            <Popover.Close className="">
              <CloseIcon />
            </Popover.Close>
          </div>
          <Inbox maxHeight="calc(100vh - 12rem)" />
          <button className="text-sm m-4 py-1.5 rounded-lg bg-[#0080FF] text-white font-semibold">
            Add comment
          </button>
          <Popover.Arrow asChild>
            <svg
              width="28"
              height="11.928888"
              viewBox="0 0 28 11.928888"
              fill="none"
              className="visible"
            >
              <path
                d="m 10.4645,10.46443 c 1.9526,1.952613 5.1185,1.952611 7.0711,-10e-6 L 28,0 H 0 Z"
                fill="#ffffff"
              />
            </svg>
          </Popover.Arrow>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
