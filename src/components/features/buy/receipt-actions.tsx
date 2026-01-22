import { RotateCcw } from "lucide-preact";
import { shopping } from "../../../contexts/shopping-context";
import { useMember } from "../../../contexts/member-context";
import { hasInsufficientBalance } from "../../../utils/validation";
import { Button } from "../../ui/button";

export function ResetButton() {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={shopping.reset}
      type="reset"
      disabled={shopping.selected.value.length === 0}
    >
      <RotateCcw class="size-5" />
    </Button>
  );
}

export function SubmitButton() {
  const { data } = useMember();
  const insufficientBalance = hasInsufficientBalance(
    shopping.total.value,
    data?.balance ?? 0,
  );
  const canSubmit = shopping.total.value > 0 && data && !insufficientBalance;

  return (
    <Button
      disabled={!canSubmit}
      variant={insufficientBalance ? "destructive" : "default"}
    >
      Payer {shopping.total.value.toFixed(2)}€
    </Button>
  );
}
