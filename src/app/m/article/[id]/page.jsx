"use client";
import React, {memo} from 'react';
import {useParams} from "next/navigation";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

function Page() {
    const params = useParams();

    return (
        <div className="container mx-auto my-8 flex flex-wrap justify-center">
            <h3 className={"text-lg font-medium"}>{params?.id === "new" ? "Yeni makale" : "Makaleyi düzenle"}</h3>

            <RichTextEditorComponent
                quickToolbarSettings={{
                    text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor', 'Alignments', '-', 'FontSize', 'FontName', 'Formats', 'OrderedList', 'UnorderedList', 'FormatPainter']
                }}
            >
                <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
                <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
            </RichTextEditorComponent>

        </div>
    );
}

export default memo(Page);
