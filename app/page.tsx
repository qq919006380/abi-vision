import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <Link href="/">
        <Button>
          <span>Start</span>
        </Button>
      </Link>
    </div>
  );
}
