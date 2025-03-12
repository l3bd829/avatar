import { useEffect } from "react";
import { pb, useConfiguratorStore } from "../store";
import "../components/Ui.css";

const AssetsBox = () => {
    const { categories, currentCategory, fetchCategories, setCurrentCategory, changeAsset, customization } = useConfiguratorStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="card">
            <div className="flex items-center gap-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setCurrentCategory(category)}
                        className={`category-button ${
                            currentCategory?.name === category.name ? "active" : "inactive"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="assets-container">
                {currentCategory?.assets?.map((asset) => (
                    <button 
                        key={asset.thumbnail}
                        onClick={() => changeAsset(currentCategory.name, asset)}
                        className={`asset-button ${
                        customization[currentCategory.name]?.asset?.id === asset.id 
                            ? "selected" 
                            : "unselected"
                        }`}
                    >                  
                        <img src={pb.files.getURL(asset, asset.thumbnail)} alt="Asset Thumbnail"/>
                    </button>
                ))}
            </div>
        </div>
    );
};

const DownloadButton = () => {
    return (
        <button className="download-button">
            Download
        </button>
    );
};

export const UI = () => {
    return (
        <main className="main-container">
            <div className="layout">
                <div className="top-bar">
                    <a href="https://wawasensei.dev/courses/react-three-fiber">
                        <img className="logo" src="images/logo.png" alt="Logo"/>
                    </a>
                    <DownloadButton/>
                </div>
                <div className="flex flex-col gap-6 mt-6">
                    <AssetsBox />
                </div>
            </div>
        </main>
    );
};