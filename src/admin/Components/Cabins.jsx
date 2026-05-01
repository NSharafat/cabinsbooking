import React, { useRef, useState } from "react";
import { Table, TableHead, TableRow, TD } from "../UI/Table";
import { UseCabins } from "../API/CabinAPI";
import StyledButton from "../UI/IconButton";
import {
  HiPencil,
  HiTrash,
  HiOutlineArrowUpOnSquare,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineArrowUpTray,
  HiOutlineArrowDownTray,
  HiOutlineArrowsPointingOut,
} from "react-icons/hi2";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import showConfirmation from "../UI/Confirmation";
import CabinForm from "../UI/CabinForm";
import Status from "../UI/Status";
import TooltipMenu from "../UI/TooltipMenu";
import IconButton from "../UI/IconLink";
import DotsButton from "../UI/DotsButton";
import MenuItem from "../UI/MenuItem";
import ContentWrapper from "../UI/ContentWrapper";
import { H3 } from "../UI/FontStyles";
import Note from "../UI/Note";
import useCabins from "../API/useCabins";
import { useQueryClient } from "@tanstack/react-query";

function confirm() {
  showConfirmation();
}
function Cabins() {
  const menref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState({});
  const [isEditSession, setisEditSession] = useState(false);
  const [open, setTooltipOpen] = useState(null);

  const { cabins, isLoading } = useCabins();
  console.log(cabins);
  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => {
            setCabinToEdit({});
            setIsOpen(false);
            setisEditSession(false);
          }}
        >
          <CabinForm
            onCancel={() => {
              setCabinToEdit({});
              setIsOpen(false);
            }}
            setIsOpen={setIsOpen}
            cabinToEdit={cabinToEdit}
            setCabinToEdit={setCabinToEdit}
            isEditSession={isEditSession}
            setisEditSession={setisEditSession}
          />
        </Modal>
      )}

      <ContentWrapper>
        <div className="flex flex-row items-center justify-between ">
          <H3>All Cabins/Bookings</H3>
        </div>

        <Table>
          <TableHead type="Header">
            <TD>Cabin Name</TD>
            <TD>Capacity</TD>
            <TD>Price</TD>
            <TD>Status</TD>
            <TD>Actions</TD>
          </TableHead>
          <tbody>
            {cabins?.map((cabin) => (
              <TableRow>
                <TD>{cabin.cabinName}</TD>
                <TD>{cabin.capacity}</TD>
                <TD>${cabin.price}</TD>
                <TD>
                  <Status type={cabin.status}>{cabin.status}</Status>
                </TD>
                <TD className="relative text-right">
                  <DotsButton
                    setOpen={setTooltipOpen}
                    index={cabin.id}
                    menuref={menref}
                  />
                  {open == cabin.id && (
                    <TooltipMenu ref={menref}>
                      {cabin.status === "checked-out" && (
                        <MenuItem onClick={() => confirm()}>
                          <IconButton>
                            <HiOutlineArrowsPointingOut />{" "}
                            <span>Mark as Available</span>
                          </IconButton>
                        </MenuItem>
                      )}
                      {cabin.status === "checked-in" && (
                        <MenuItem onClick={() => confirm()}>
                          <IconButton>
                            <HiOutlineArrowUpTray /> <span>Checkout</span>
                          </IconButton>
                        </MenuItem>
                      )}
                      {cabin.status === "available" && (
                        <MenuItem onClick={() => confirm()}>
                          <IconButton>
                            <HiOutlineArrowDownTray /> <span>Check in</span>
                          </IconButton>
                        </MenuItem>
                      )}

                      <MenuItem
                        onClick={() => {
                          setCabinToEdit({
                            cabinName: cabin.cabinName,
                            capacity: cabin.capacity,
                            price: cabin.price,
                          });
                          setIsOpen(true);
                          setisEditSession(true);
                        }}
                      >
                        <IconButton>
                          <HiOutlinePencil /> <span>Edit</span>
                        </IconButton>
                      </MenuItem>

                      <MenuItem onClick={() => confirm()}>
                        <IconButton>
                          <HiOutlineTrash /> <span>Delete</span>
                        </IconButton>
                      </MenuItem>
                    </TooltipMenu>
                  )}
                </TD>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <div className="flex flex-row items-center justify-between ">
          <Note>
            Available <b>{cabins?.length}</b> Cabins out of{" "}
            <b>{cabins?.length}</b>
          </Note>
          <Button
            type={"button"}
            variation={"primary"}
            onClick={() => setIsOpen(true)}
          >
            Add new cabin
          </Button>
        </div>
      </ContentWrapper>
    </>
  );
}

export default Cabins;
