"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
    return ( 
        <div className="w-1/2">
            <div className="">
                <form className="flex space-x-3">
                    <Input className=" focus:border-transparen focus:ring-0 focus:outline-0" />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </div>
     );
}
 
export default Search;