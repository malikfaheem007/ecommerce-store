import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const socialLink = [
  {
    title: "Youtube",
    href: "https://youtube.com/@reactjsBD",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://github.com/reactjsBD",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://linkedin.com/in/reactjsBD",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://facebook.com/@reactjsBD",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://slack.com/@reactjsBD",
    icon: <Slack className="w-5 h-5" />,
  },
];
const SocialMedia = ({ className, iconClassName, tooltipClassName }: props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                key={item?.title}
                className={cn("p-2 border rounded-full")}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
