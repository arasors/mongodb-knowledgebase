"use client";
import React, {memo, useState} from 'react';
import {useParams} from "next/navigation";
import {
    EditorComposer,
    Editor,
    ToolbarPlugin,
    AlignDropdown,
    BackgroundColorPicker,
    BoldButton,
    CodeFormatButton,
    FloatingLinkEditor,
    FontFamilyDropdown,
    FontSizeDropdown,
    InsertDropdown,
    InsertLinkButton,
    ItalicButton,
    TextColorPicker,
    TextFormatDropdown,
    UnderlineButton,
    Divider,
} from 'verbum';
function Page() {
    const params = useParams();
    const [state, setState] = useState(`<b>aras</b><i>test metni</i>`);

    return (
        <div className="container mx-auto my-8 flex flex-col flex-wrap justify-center">
            <h3 className={"text-lg font-medium"}>{params?.id === "new" ? "Yeni makale" : "Makaleyi düzenle"}</h3>

            <EditorComposer>
                <Editor
                    hashtagsEnabled={true}
                    onChange={(val) => setState(val)}
                    autoLinkEnabled={true}
                    emojisEnabled={true}
                    actionsEnabled={true}
                >
                    <ToolbarPlugin defaultFontSize="20px" style={{height: "50px"}}>
                        <FontFamilyDropdown />
                        <FontSizeDropdown />
                        <Divider />
                        <BoldButton />
                        <ItalicButton />
                        <UnderlineButton />
                        <CodeFormatButton />
                        <InsertLinkButton />
                        <TextColorPicker />
                        <BackgroundColorPicker />
                        <TextFormatDropdown />
                        <Divider />
                        <InsertDropdown enablePoll={true} />
                        <Divider />
                        <AlignDropdown />
                    </ToolbarPlugin>
                </Editor>
            </EditorComposer>

        </div>
    );
}

export default memo(Page);
