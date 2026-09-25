import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  className?: string;
  href?: string;
  action?: React.ReactNode;
};

const BaseEmptyState = ({
  icon,
  title,
  description,
  buttonText,
  className,
  href,
  action,
}: Props) => {
  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col items-center justify-center rounded-none border-none bg-transparent shadow-none",
        className,
      )}
    >
      <CardContent className="flex w-full max-w-xl flex-col items-center justify-center space-y-6 p-6">
        <div className="border-border flex size-16 items-center justify-center rounded-xl border-2 p-2">
          {icon}
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-1.5 text-center">
            <Typography.H4>{title}</Typography.H4>
            <Typography.P className="mt-0 leading-normal text-balance">{description}</Typography.P>
          </div>
        </div>

        {action
          ? action
          : buttonText && (
              <Button className="w-full max-w-xs" size="lg" asChild>
                <Link to={href || "/pricing"} target="_blank">
                  {buttonText}
                </Link>
              </Button>
            )}
      </CardContent>
    </Card>
  );
};

export default BaseEmptyState;
