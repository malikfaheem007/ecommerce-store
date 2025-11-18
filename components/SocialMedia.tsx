import {TooltipContent, TooltipProvider} from "@radix-ui/react-tooltip";
import {Facebook, Github, Linkedin, Slack, Youtube} from "lucide-react";
import {Tooltip, TooltipTrigger} from "./ui/tooltip";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}
const socialLink = [
  {
    title: "Youtube",
    href: "https://youtube.com",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://github.com",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://slack.com",
    icon: <Slack className="w-5 h-5" />,
  },
];
const SocialMedia = ({className, iconClassName, tooltipClassName}: props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                key={item?.title}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                  iconClassName
                )}>
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold border rounded-md px-3 py-1.5 text-sm shadow-lg",
                tooltipClassName
              )}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
