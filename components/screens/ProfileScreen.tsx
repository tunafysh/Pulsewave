import { Dispatch, SetStateAction, useEffect } from "react";
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Settings } from "@/components/defs"
import { Input } from "@/components/ui/input";

export default function ProfileScreen({settings, setSettings, easter}: { settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>, easter: boolean}) {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        // Set initial theme based on system preference or saved settings    
        setSettings(prev => ({ ...prev, darkmode: theme == "dark" }))
      }, [theme, setTheme, setSettings])

      const handleThemeChange = () => {
        setSettings(prev => {
          const newDarkMode = !prev.darkmode
          setTheme(newDarkMode ? 'dark' : 'light')
          return { ...prev, darkmode: newDarkMode }
        })
      }

    if (easter){
      return (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-foreground font-semibold">Version: 1.0.0</p>
        </div>
      );
    }
    else {
      return (<div className="w-full h-full">
        <div className="w-full h-16 p-4 flex  justify-between ">
            <h1 className="text-2xl font-semibold">Profile & Settings</h1>
        </div>
        <div className="w-full flex items-center flex-row p-4 justify-between h-[50px] py-6">
                <h1 className="text-xl font-bold">Dark Mode</h1>
                <Switch checked={settings.darkmode} onClick={handleThemeChange} />
            </div>
            <hr />
            <div className="w-full flex items-center flex-row p-4 justify-between h-[50px] py-6">
                <h1 className="text-xl font-bold">Username</h1>
                <Input className="w-fit border-2 text-primary" value={settings.name} onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}/>
            </div>
            <hr />
            <div className="w-full flex items-center flex-row p-4 justify-between h-[50px] py-6">
                <h1 className="text-xl font-bold">Handle</h1>
                <Input className="w-fit border-2 text-primary" value={settings.handle} onChange={(e) => setSettings(prev => ({ ...prev, handle: e.target.value }))}/>
            </div>
    </div>);
    }
}