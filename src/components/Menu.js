import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Translator from "./Translator";
import Copywriter from "./Copywriter";
import Summary from "./Summary";
import Chatbot from "./Chatbot";

export default class MenuSecondaryPointing extends Component {
    state = { activeItem: "번역" };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    renderContent() {
        const { activeItem } = this.state;

        switch (activeItem) {
            case "번역":
                return <Translator />; // 번역 컴포넌트 렌더링
            case "광고문구 작성":
                return <Copywriter />; // 광고문구 작성 컴포넌트 렌더링
            case "요약":
                return <Summary />; // 요약 컴포넌트 렌더링
            case "챗봇":
                return <Chatbot />; // 챗봇 컴포넌트 렌더링
            default:
                return null;
        }
    }

    render() {
        const { activeItem } = this.state;

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item
                        name="번역"
                        active={activeItem === "번역"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="광고문구 작성"
                        active={activeItem === "광고문구 작성"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="요약"
                        active={activeItem === "요약"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="챗봇"
                        active={activeItem === "챗봇"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="logout"
                            active={activeItem === "logout"}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu>
                <div>
                    {this.renderContent()}{" "}
                    {/* 선택한 탭에 따라 컴포넌트 렌더링 */}
                </div>
            </div>
        );
    }
}
