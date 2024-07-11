import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

// ダイアログコンポーネント
function TravelGuideDialog(props: Props) {
  const { open, setOpen, title, message, onConfirm } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="whitespace-pre-wrap">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          {onConfirm && (
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => {
                onConfirm(e);
              }}
            >
              確定
            </Button>
          )}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TravelGuideDialog;
