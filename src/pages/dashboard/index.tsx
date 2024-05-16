import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface TextItem {
  text: string;
  id: number;
  title?: string;
  faviconUrl?: string;
  createdTime: Date;
  category: string;
}

const dropInAnimation = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState<string>("");
  const [savedTexts, setSavedTexts] = useState<TextItem[]>([]);
  const [remainingSpace, setRemainingSpace] = useState<number>(0);
  const [remainingStoragePercentage, setRemainingStoragePercentage] =
    useState<number>(100);
  const [category, setCategory] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const storedTexts = localStorage.getItem("texts");
    if (storedTexts) {
      setSavedTexts(JSON.parse(storedTexts));
    }
    logRemainingLocalStorageSpace();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const fetchUrlData = async (url: string) => {
    try {
      const response = await fetch(
        `
        //api
        =${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      console.log("URL data:", data);
      return { title: data.title, faviconUrl: data.image, category: "default" };
    } catch (error) {
      console.error("Error fetching URL data:", error);
      return { title: "", faviconUrl: "", category: "default" };
    }
  };

  const saveToLocalStorage = async (event: React.SyntheticEvent) => {
    if (inputText === "") return;

    const { title, faviconUrl, category } = await fetchUrlData(inputText);

    const newTexts: TextItem[] = [
      ...savedTexts,
      {
        text: inputText,
        id: new Date().getTime(),
        title,
        faviconUrl,
        createdTime: new Date(),
        category,
      },
    ];
    localStorage.setItem("texts", JSON.stringify(newTexts));
    setSavedTexts(newTexts);
    setInputText("");

    logRemainingLocalStorageSpace();
  };

  const deleteTextItem = (id: number) => {
    const filteredTexts = savedTexts.filter((textItem) => textItem.id !== id);
    localStorage.setItem("texts", JSON.stringify(filteredTexts));
    setSavedTexts(filteredTexts);

    toast({
      title: "Attention!",
      description: "Your bookmark has been deleted.",
    });

    logRemainingLocalStorageSpace();
  };

  function logRemainingLocalStorageSpace() {
    const totalStorage = 5 * 1024 * 1024;
    let usedStorage = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const item = localStorage.getItem(key);
        if (item) {
          usedStorage += item.length * 2;
        }
      }
    }

    const remainingStorage = totalStorage - usedStorage;
    console.log(`Remaining local storage space: ${remainingStorage} bytes`);
    setRemainingSpace(remainingStorage);

    const percentage = (remainingStorage / totalStorage) * 100;
    setRemainingStoragePercentage(percentage);
  }

  const isValidUrl = (str: string) => {
    const urlRegex =
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$|^[^\s/$.?#].[^\s]*\.[^\s]{2,}$/i;
    return urlRegex.test(str);
  };

  const filteredTexts = savedTexts.filter((textItem) => {
    return (
      (!textItem.category || textItem.category.includes(category) || category === "") &&
      (textItem.text.toLowerCase().includes(searchText.toLowerCase()) ||
        (textItem.title && textItem.title.toLowerCase().includes(searchText.toLowerCase())))
    );
  });
  

  return (
    <div className="bg-white ">
      <div className="relative px-6 isolate pt-14 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="sticky z-50 pb-4 top-14 supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
            <div className="flex justify-between mb-4">
              <Select>
                <SelectTrigger className="w-[300px]">
                  <SelectValue
                    placeholder="Category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Plus className="w-5 h-5 text-zinc-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveToLocalStorage(e);
                  }
                }}
                name="text"
                id="text"
                autoComplete="off"
                className="block w-full py-3 pl-10 text-gray-900 transition-all duration-200 border-0 rounded-md ring-1 ring-inset ring-neutral-200 focus:ring-2 focus:ring-inset focus:ring-neutral-400 sm:text-sm sm:leading-6 placeholder:text-zinc-400"
                placeholder="Insert a link, image, or just plain text..."
              />
            </div>
          </div>

          <div className="mt-4 mb-4">
            <Separator />
          </div>

          <ul role="list" className="mb-24 space-y-2">
{filteredTexts.map((textItem, index) => (
  <motion.li
    key={textItem.id}
    initial="hidden"
    animate="visible"
    variants={dropInAnimation}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    {/* Wrap the entire list item with an anchor tag */}
      <li className="relative flex justify-between px-2 py-2 transition-all duration-200 border rounded-md hover:bg-gray-100 gap-x-6">
        <div className="flex gap-x-4">
          {isValidUrl(textItem.faviconUrl || "") ? (
            <img
              className="flex-none w-12 h-12 rounded-md bg-gray-50"
              src={textItem.faviconUrl}
              alt=""
            />
          ) : (
            <div className="bg-gray-200 dark:bg-[#333] w-12 h-12 animate-pulse rounded-md" />
          )}
          <div className="flex-auto min-w-0">
            <div className="text-sm font-semibold leading-6 text-gray-900">
              <p>
                <span className="absolute inset-x-0 bottom-0 -top-px" />
                {textItem.title}
              </p>
            </div>
            <a href={textItem.text} target="_blank" rel="noopener noreferrer">
            <p className="flex mt-1 text-xs leading-5 text-blue-500">
              <span className="relative max-w-sm truncate hover:underline">
                {textItem.text}
              </span>
            </p>
            </a> {/* Closing anchor tag */}

          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <div className="flex space-x-2">
              {/* <Badge variant="default">
                {isValidUrl(textItem.text) ? "Link" : "Other"}
              </Badge> */}
              <Badge variant="outline">Category</Badge>
            </div>

            {/* <p className="mt-1 text-xs leading-5 text-gray-500">
              Created{" "}
              <time>
                {textItem.createdTime
                  ? textItem.createdTime.toLocaleString()
                  : ""}
              </time>
            </p> */}
          </div>

          <Trash2
            className="z-30 flex-none w-5 h-5 text-gray-400 cursor-pointer"
            onClick={() => deleteTextItem(textItem.id)}
            aria-hidden="true"
          />
        </div>
      </li>
  </motion.li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Api is pending
// Category is paending 