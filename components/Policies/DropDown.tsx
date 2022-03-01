import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

export default function DropDown() {
  return (
    <div className="my-4">
      <Dropdown>
        <div className="d-inline">
          <span className="bg-light">Legal Matters</span>
        </div>
        &nbsp;&nbsp;
        <Dropdown.Toggle className="bg-dark btn-dark py-0" />
        <Dropdown.Menu>
          <Dropdown.Item className="policy-dropdown-item">
            <Link href="/policies/terms">
              <a>Terms of service</a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item className="policy-dropdown-item">
            <Link href="/policies/privacy">
              <a>Privacy Policy</a>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item className="policy-dropdown-item">
            <Link href="/policies/cancellation-and-refund">
              <a>Cancellation & Refund</a>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
